import React, {useState} from 'react';
import {TextField, Button, Grid} from "@mui/material";
import '../styles/Comp1.css'
import {useForm} from "react-hook-form";
import {DevTool} from '@hookform/devtools'

const Comp1 = () => {
    const {register, handleSubmit, control, formState: {errors}} = useForm({
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
    const registerOptions = {
        Height_N: {
            required: "Поле обязательно",
            min: {
                value: 50,
                message: "50..500 м"
            },
            max: {
                value: 500,
                message: "50..500 м"
            }
        },
        Width_M: {
            required: "Поле обязательно",
            min: {
                value: 50,
                message: "50..500 м"
            },
            max: {
                value: 500,
                message: "50..500 м"
            }
        },
        step_h: {
            required: "Поле обязательно",
            min: {
                value: 0.001,
                message: "0.001..1 м"
            },
            max: {
                value: 1,
                message: "0.001..1 м"
            }
        },
        monte_karlo_L: {
            required: "Поле обязательно",
            min: {
                value: 1,
                message: "1..100"
            },
            max: {
                value: 100,
                message: "1..100"
            }
        },
        speed_sound_c: {
            required: "Поле обязательно",
            min: {
                value: 200,
                message: "200..6000 м/с"
            },
            max: {
                value: 6000,
                message: "200..6000 м/с"
            }
        },
        damping_factor_μ: {
            required: "Поле обязательно",
            min: {
                value: 0,
                message: "0..1 м^(-1)"
            },
            max: {
                value: 1,
                message: "0..1 м^(-1)"
            }
        },
        scatt: {
            required: "Поле обязательно",
            min: {
                value: 1,
                message: "1..10"
            },
            max: {
                value: 10,
                message: "1..10"
            }
        },
        Scattering_σ_b: {
            required: "Поле обязательно",
            min: {
                value: 0,
                message: "0..1 м^(-1)"
            },
            max: {
                value: 1,
                message: "0..1 м^(-1)"
            }
        },
    }
    return (
        <div className="inputForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            label="Высота области (N)"
                            type="number"
                            {...register('Height_N', registerOptions.Height_N)}
                            error={!!errors.Height_N}
                            helperText={errors?.Height_N && errors.Height_N?.message}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Ширина области (M)"
                            type="number"
                            {...register('Width_M', registerOptions.Width_M)}
                            error={!!errors.Width_M}
                            helperText={errors?.Width_M && errors.Width_M?.message}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Шаг по области (h)"
                            {...register('step_h', registerOptions.step_h)}
                            error={!!errors.step_h}
                            helperText={errors?.step_h && errors.step_h?.message}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Число испытаний Монте-Карло (L)"
                            type="number"
                            {...register('monte_karlo_L', registerOptions.monte_karlo_L)}
                            error={!!errors.monte_karlo_L}
                            helperText={errors?.monte_karlo_L && errors.monte_karlo_L?.message}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Скорость звука (с)"
                            type="number"
                            {...register('speed_sound_c', registerOptions.speed_sound_c)}
                            error={!!errors.speed_sound_c}
                            helperText={errors?.speed_sound_c && errors.speed_sound_c?.message}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Коэффициент затухания (μ)"
                            {...register('damping_factor_μ', registerOptions.damping_factor_μ)}
                            error={!!errors.damping_factor_μ}
                            helperText={errors?.damping_factor_μ && errors.damping_factor_μ?.message}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Количество актов рассеяния (scatt)"
                            type="number"
                            {...register('scatt', registerOptions.scatt)}
                            error={!!errors.scatt}
                            helperText={errors?.scatt && errors.scatt?.message}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Коэффициент рассеяния в основной среде (σ_b)"
                            {...register('Scattering_σ_b', registerOptions.Scattering_σ_b)}
                            error={!!errors.Scattering_σ_b}
                            helperText={errors?.Scattering_σ_b && errors.Scattering_σ_b?.message}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Отправить
                </Button>
            </form>
            <DevTool control={control}/>
        </div>
    );
};
export default Comp1;