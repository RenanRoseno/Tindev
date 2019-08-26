import React, { useEffect, useState } from 'react'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import itsamatch from '../assets/itsamatch.png'

import io from 'socket.io-client'
import './Main.css'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Main({ match }){
   const [users, setUsers] = useState([])
   const [matchDev, setMatchDev] = useState(null)

   useEffect( () => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: { 
                    user: match.params.id, 
                }
            })
            
            setUsers(response.data)
        }
        loadUsers();
    }, [match.params.id])

    useEffect(() => {
        const socket = io('http://localhost:3030' , {
            query: { user: match.params.id}
        })
        
        socket.on('match', dev => {
            setMatchDev(dev)
        })
    }, [match.params.id])


    async function handleLike(id){
        await api.post(`/devs/${id}/likes` , null, {
            headers: { user : match.params.id},
        })
        
        setUsers( users.filter(user => user._id != id))
    }

    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes` , null, {
            headers: { user : match.params.id},
        })

        setUsers( users.filter(user => user._id != id))
    }

    return (
        <div className= "main-container">
            <img src={logo} alt="Tindev"></img>
            <Link className="exit" to="/"><div className="exit">SAIR</div></Link>
            {users.length <= 0 ?
                <div className = "empty">Não existem mais usuários para dar match! :( </div>
                : <ul>
                {users.map(user => (
                     <li key={user._id}>
                     <img src={user.avatar} alt="" />
                     <footer>
                         <strong>{user.name}</strong> 
                        <p>{user.bio}</p>
                     </footer> 
 
                     <div className="buttons">
                         <button type="button" onClick={() => handleDislike(user._id)}>
                             <img src={dislike} alt="Dislike" />
                         </button>
                         <button type="button" onClick={() => handleLike(user._id)}>
                             <img src={like} alt="Like" />
                         </button>
                     </div>
                 </li>
                ))}
               
            </ul>}
            {
                matchDev && (
                    <div className="match-container">
                        <img src={itsamatch} alt="It's a match" />
                        <img className="avatar" src={matchDev.avatar} />
                        <strong> {matchDev.name}</strong>
                        <p>{matchDev.bio}</p>
                        <button type ="button" onClick = {() => setMatchDev(null)}> FECHAR </button>
                    </div>

                )
            }
        </div>
        
    )
}