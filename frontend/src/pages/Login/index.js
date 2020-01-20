import React, { useState } from 'react';
import api from '../../services/api'

export default function Login({ history } ){
const [email, setEmail] = useState('');

async function handleSubmit(event){
event.preventDefault();

 const reponse = await api.post('/sessions', { email });

 const { _id } = reponse.data;

localStorage.setItem('user', _id);

history.push('/deshboard');

console.log(reponse);
console.log(reponse.headers);
}

 return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre  <strong>talentos</strong> para sua empresa.
        </p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input type="email"
            id="email"
            placeholder="Seu melhor e-mail." 
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
            <button className='btn' type='submit'>Entrar</button>
        </form>
      </>
    );
}