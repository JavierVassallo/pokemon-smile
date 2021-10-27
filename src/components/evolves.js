import { useEffect, useState } from "react";

export default function Evol({ principal,evolvesPoke }) {
    console.log('Los evolve pokes son: ',evolvesPoke);
    const [evol,setEvol]=useState([]);
    const [loadd, setLoadd] = useState(true);
    
    useEffect(() => {
        const recursiveEvolves = async function(evolves){
            if(evolves && evolves[0]){
                //console.log('entre por el if');
                evolves.forEach(async ev=>{
                    //console.log('nombre evolucion: ',ev.species.name);
                    evol.push(ev.species.name);
                    await setEvol(evol);
                    //console.log('evolvs: ',evol)
                    await recursiveEvolves(ev.evolves_to);
                })
            }
            else{
                console.log("Ya no hay mas evoluciones")
                setLoadd(false);
            }
        
        };
       recursiveEvolves(evolvesPoke);
        
      }, [setEvol]);
      
        return(<>{loadd ? (<><p>loading ...</p></>) : (<><p>{principal}</p>
            {evol.map(ev=>{
                console.log(ev);
                return(<p>{ev}</p>)
            })}</>)}</>);
}