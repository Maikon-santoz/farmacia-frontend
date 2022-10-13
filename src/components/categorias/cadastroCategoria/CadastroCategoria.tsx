import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Categoria from "../../../models/Categoria";
import { busca, buscaId, post, put } from "../../../service/Service";

function CadastroCategoria(){
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [token, setToken] = useLocalStorage('token');
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        tipo: ''
    })

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")

        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/categoria/${id}`, setCategoria, {
            headers: {
              'Authorization': token
            }
          })
        }

        function updatedTema(e: ChangeEvent<HTMLInputElement>) {

            setCategoria({
                ...categoria,
                [e.target.name]: e.target.value,
            })

        }

        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            console.log("categoria " + JSON.stringify(categoria))

            if (id !== undefined) {
                console.log(categoria)
                put(`/categoria`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Categoria atualizado com sucesso');
            } else {
                post(`/categoria`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Categoria cadastrado com sucesso');
            }
            back()

        }

        function back() {
           navigate('/categoria')
        }
    
        return (
            <>
           <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro Categoria</Typography>
                <TextField value={categoria.tipo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="tipo" label="tipo" variant="outlined" name="tipo" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
            </>
           
        )
    }
    export default CadastroCategoria;



    

