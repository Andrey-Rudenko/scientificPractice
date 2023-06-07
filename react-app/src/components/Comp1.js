import React, {useState} from 'react';
import {TextField, Button, Grid} from "@mui/material";
import '../styles/Comp1.css'
import {useForm} from "react-hook-form";

const Comp1 = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {}
    })

    const submit = data => {
        console.log(data);
    }

    return (
        <div className="inputForm">
            <form onSubmit={handleSubmit(submit)}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Высота области (N)"
                            type="number"
                            defaultValue="200"
                            {...register('Height')}

                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Ширина области (M)"
                            type="number"
                            defaultValue="400"
                            {...register('Width')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Шаг по области (h)"
                            type="number"
                            defaultValue="0.4"
                            {...register('step')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Число испытаний Монте-Карло (L)"
                            type="number"
                            defaultValue="100"
                            {...register('monte-karlo')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Скорость звука (с)"
                            type="number"
                            defaultValue="1500"
                            {...register('speed sound')}

                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Коэффициент затухания (μ)"
                            type="number"
                            defaultValue="0.018"
                            {...register('damping factor')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Количество актов рассеяния (scatt)"
                            type="number"
                            defaultValue="2"
                            {...register('scatt')}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-number"
                            label="Коэффициент рассеяния в основной среде (σ_b)"
                            type="number"
                            defaultValue=""
                            {...register('Scattering')}
                        />
                    </Grid>
                </Grid>
                <button>Отправить</button>
            </form>



        </div>
    );
};

export default Comp1;