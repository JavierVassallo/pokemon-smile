import { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Card from './card';

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled.button`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filtrar por nombre"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
		<ClearButton type="button" onClick={onClear}>
			X
		</ClearButton>
	</>
);

export default function Lista() {
  const [pokemonList, setPokemonList] = useState();
  const [load, setLoad] = useState(true);

  const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [pokemon, setPokemon] = useState(''); 
	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);
  //...
  const columnas = [
    {
      name:'Nombre',
      selector: row => row.name,
      sorteable:true,
      
    },
    {
      name:'Url',
      selector: row => row.url,
      cell: row => (
        <button id={row.url} onClick={(e) => handleSubmit(row.url,e)}>
          Ver
        </button>
      ),
      sorteable:true,
      right:true
    },
  ]
  /*const paginacionOpciones={
    rowsPerPagetext:'filas por pagina',
    rangeSeparatorText:'de',
    selecAllRowsItem:true,
    selecAllRowsText:'Todos',

  }*/
  function handleSubmit(url,e) {
    e.preventDefault();
    handleShow();
    setPokemon(url)
    console.log('You clicked submit.');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        //(B)
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118");
        const json = await res.json();
        //(C)
        await setPokemonList(json.results);
        setLoad(false);
        
      } catch (error) {
        console.log("-->", error);
      }
    };
    fetchData();
    
  }, [setPokemonList,setLoad]); //(A)
  
  console.log(pokemonList);

return (
<div className="App">
<div className='pokegallery'>
{ load ? (
<p>Loading...</p>
) : (
  <>
  <div className='table-responsive'>
  <DataTable
    columns={columnas}
    data={pokemonList.filter(
      item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    ) }
    title='Pokemones Lista'
    pagination
    fixedHeader={true}
    fixedHeaderScrollHeight='300px'
    //paginationComponentOptions={paginacionOpciones}
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			selectableRows
			persistTableHead
    />
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Pokemon Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <><Card pokemon={pokemon}/></>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
)}
</div>
</div>
);
}