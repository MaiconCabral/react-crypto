import axios from 'axios';
import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

const Crypto = () => {
    // 1 - hooks
    const [search, setSearch] = useState("")
    const [cryptos, setCryptos] = useState([])

    // 2 - func pegar dados
    const endpoint = 'https://api.coingecko.com/api/v3/coins' 
	// const endpoint = 'https://pro-api.coingecko.com/api/v3/' 
	 
    const showData = () => {
        axios.get(endpoint).then( (res) =>{
            //console.log(res.data)
            setCryptos(res.data)
        })
    }
    
    useEffect( () =>{
        showData()
    }, [])

    // 3 - func de busca
    const searcher = (e) => {
        setSearch(e.target.value)
    }

    // 4 - filtrar os dados
    const results = !search ? cryptos : cryptos.filter( (val)=> val.name.toLowerCase().includes(search.toLocaleLowerCase()) ) 
    
    // redenrizar a view
    return (
        <>
        <div className='row'>
            <div className='col-10 offset-1 col-md-10 offset-md-1'>
                <input value={search} onChange={searcher} type='text' placeholder='Search...' className='form-control' />
                <table className='table table-dark table-hover mt-4'>
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Price 24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        { results.map( (result)=> (
                            <tr key={result.id}>
                                <td>{result.market_data.market_cap_rank}</td>
                                <td className='text-justify'><small><img className='crypto-img' src={result.image.small}/> {result.name} </small></td>
                                <td>{result.symbol.toUpperCase()}</td>
                                <td>{result.market_data.current_price.bmd.toFixed(2)}</td>
                                <td>
                                    { result.market_data.price_change_percentage_24h < 0 ? (
                                    <span className='badge bg-danger'>{result.market_data.price_change_percentage_24h}</span>  
                                    ):(
                                    <span className='badge bg-success'>{result.market_data.price_change_percentage_24h}</span>    
                                    ) }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    )
}

export default Crypto;