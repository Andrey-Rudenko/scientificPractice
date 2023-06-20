import React, {useState} from 'react';
import {TextField, Button, Grid} from "@mui/material";
import '../styles/Comp1.css'
import {useForm} from "react-hook-form";
import {DevTool} from '@hookform/devtools'


const Comp1 = () => {
    const {register, handleSubmit, control} = useForm({
        defaultValues: {
            Height_N: 200,
            Width_M: 400,
            step_h: 0.4,
            monte_karlo_L: 100,
            speed_sound_c: 1500,
            damping_factor_μ: 0.018,
            scatt: 2,
            Scattering_σ_b: 0.2
        }
    });
    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div className="inputForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            label="Высота области (N)"
                            type="number"
                            helperText="Some important text"
                            {...register('Height_N', {required: "Email is required", min:50.0, max:500.0})}

                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Ширина области (M)"
                            type="number"
                            helperText="Some important text"
                            {...register('Width_M', {required: true, min:50.0, max:500.0})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Шаг по области (h)"
                            helperText="Some important text"
                            {...register('step_h', {required: true, min:0.001, max:1.0})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Число испытаний Монте-Карло (L)"
                            type="number"
                            helperText="Some important text"
                            {...register('monte_karlo_L', {required: true, min:1.0, max:100.0})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Скорость звука (с)"
                            type="number"
                            helperText="Some important text"
                            {...register('speed_sound_c', {required: true, min:200.0, max:6000.0})}

                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Коэффициент затухания (μ)"
                            helperText="Some important text"
                            {...register('damping_factor_μ', {required: true, min:0.0, max:1.0})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Количество актов рассеяния (scatt)"
                            type="number"
                            helperText="Some important text"
                            {...register('scatt', {required: true, min:1.0, max:10.0})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Коэффициент рассеяния в основной среде (σ_b)"
                            helperText="Some important text"
                            {...register('Scattering_σ_b', {required: true, min:0.0, max:1.0})}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" color="secondary" type="submit">
                    Отправить
                </Button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default Comp1;