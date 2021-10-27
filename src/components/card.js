import {  useEffect, useRef, useState } from "react";
import Evol from "./evolves";

export default function Card({ pokemon }) {
    const [poke,setPoke]=useState();
    const [cadena,setCadena]=useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            //(B)
            const res = await fetch(pokemon);
            const json = await res.json();
            //(C)
            console.log(json);
            const speciesUrl = await fetch(json.species.url);
            const species = await speciesUrl.json();
            const chainUrl = await fetch(species.evolution_chain.url);
            const chain = await chainUrl.json();
            console.log('cadena de evolucion: ', chain.chain);
            await setPoke(json);
            await setCadena(chain.chain);
            await setLoading(false);
            
          } catch (error) {
            console.log("-->", error);
          }
        };
        fetchData();
        
      }, [setPoke,setLoading]);
    //const comprobarEvolucion = ();
    /*var recursiveEvolves = function(evolves){
        if(evolves!=[]){
            console.log('entre por el if');
            evolves.forEach(ev=>{
                console.log('nombre evolucion: ',ev.species.name);
                referencia.current=<p>{ev.species.name}</p>
                
                recursiveEvolves(ev.evolves_to);
            })
        }
        else{
            console.log("Ya no hay mas evoluciones")
          
        }
    
    };*/
    return(<>{loading ? (<><p>loading ...</p></>) : (<div><div style={{display:'inline-block'}} id={poke.id} key={poke.id}>
        <div className='card' style={{ width: '10rem', height: '15rem', backgroundColor: '#F0F0C9' }}>
        <img  src={poke.sprites.front_default} alt='pokemon' />
        <div >
        <h5 >{poke.name}</h5>
        <h6>type: {poke.types[0].type.name}</h6>
        </div>
        </div>
        </div>
        <div id={'evolveCadena'}  style={{display:'inline-block'}}>
            <h3>Cadena de evolucion</h3>
            <Evol
                principal={cadena.species.name}
                evolvesPoke={cadena.evolves_to}
            />
        </div>
        </div>)}</>);
}