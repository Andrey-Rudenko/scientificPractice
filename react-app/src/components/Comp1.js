import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import '../styles/Comp1.css'
import {useForm} from "react-hook-form";
import Tooltip from '@mui/material/Tooltip';
import CanvasComp from "./CanvasComp";
import * as THREE from 'three';

import {useWebworker} from '../hooks/use-webworker';


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function navFunction(N, M, H, L, c, mu, scatt) {
    const res = [];
    for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < M; j++) {
            row.push(Math.floor(Math.random() * 10));
        }
        res.push(row);
    }
    console.log(N, M, H, L, c, mu, scatt);
    return res;
}


//


let step_h = 0.4
let monte_karlo_L = 100
let speed_sound_c = 1500
let damping_factor_mu = 0.018
let scatt = 2
let dataForCanvas = navFunction(200, 400, step_h, monte_karlo_L, speed_sound_c, damping_factor_mu, scatt)
const Comp1 = () => {
        const [widthValue, setWidthValue] = useState(400);
        const [heightValue, setHeightValue] = useState(200);
        const {register, handleSubmit, reset, control, formState: {errors}} = useForm({
            defaultValues: {
                Height_N: 200,
                Width_M: 400,
                step_h: 0.4,
                monte_karlo_L: 100,
                speed_sound_c: 1500,
                damping_factor_mu: 0.018,
                scatt: 2,
            }
        });

        const {result, run} = useWebworker((data) => {

            let N = data.Height_N
            let M = data.Width_M
            let H = data.step_h
            let L = data.monte_karlo_L
            let c = data.speed_sound_c
            let mu = data.damping_factor_mu
            let scatt = data.scatt

            const res = [];
            for (let i = 0; i < N; i++) {
                const row = [];
                for (let j = 0; j < M; j++) {
                    row.push(Math.floor(Math.random() * 10));
                }
                res.push(row);
            }
            console.log(res);
            return res;
        })
        const onSubmit = data => {
            setHeightValue(data.Height_N);
            setWidthValue(data.Width_M);
            run(data);
            // dataForCanvas = navFunction(data.Height_N, data.Width_M, data.step_h, data.monte_karlo_L, data.speed_sound_c, data.damping_factor_mu, data.scatt);
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
            damping_factor_mu: {
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
        }
        return (
            <div className="inputForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} className="textFieldGrid">
                        <Grid item xs={3}>
                            <Tooltip title="Диапазон от 50 до 500">
                                <TextField
                                    label="Высота области (N)"
                                    type="number"
                                    {...register('Height_N', registerOptions.Height_N)}
                                    error={!!errors.Height_N}
                                    helperText={errors?.Height_N && errors.Height_N?.message}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="Диапазон от 50 до 500">
                                <TextField
                                    label="Ширина области (M)"
                                    type="number"
                                    {...register('Width_M', registerOptions.Width_M)}
                                    error={!!errors.Width_M}
                                    helperText={errors?.Width_M && errors.Width_M?.message}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="Диапазон от 0.001 до 1">
                                <TextField
                                    label="Шаг по области (h)"
                                    {...register('step_h', registerOptions.step_h)}
                                    error={!!errors.step_h}
                                    helperText={errors?.step_h && errors.step_h?.message}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="Диапазон от 1 до 100">
                                <TextField
                                    label="Число испытаний Монте-Карло (L)"
                                    type="number"
                                    {...register('monte_karlo_L', registerOptions.monte_karlo_L)}
                                    error={!!errors.monte_karlo_L}
                                    helperText={errors?.monte_karlo_L && errors.monte_karlo_L?.message}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="Диапазон от 200 до 6000">
                                <TextField
                                    label="Скорость звука (с)"
                                    type="number"
                                    {...register('speed_sound_c', registerOptions.speed_sound_c)}
                                    error={!!errors.speed_sound_c}
                                    helperText={errors?.speed_sound_c && errors.speed_sound_c?.message}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="Диапазон от 0 до 1">
                                <TextField
                                    label="Коэффициент затухания (μ)"
                                    {...register('damping_factor_mu', registerOptions.damping_factor_mu)}
                                    error={!!errors.damping_factor_mu}
                                    helperText={errors?.damping_factor_mu && errors.damping_factor_mu?.message}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="Диапазон от 1 до 10">
                                <TextField
                                    label="Количество актов рассеяния (scatt)"
                                    type="number"
                                    {...register('scatt', registerOptions.scatt)}
                                    error={!!errors.scatt}
                                    helperText={errors?.scatt && errors.scatt?.message}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained" color="primary" type="submit">
                                Запуск расчетов
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} className="buttons">
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    reset({
                                        Height_N: "",
                                        Width_M: "",
                                        step_h: "",
                                        monte_karlo_L: "",
                                        speed_sound_c: "",
                                        damping_factor_mu: "",
                                        scatt: "",
                                    })
                                }

                                }
                            >отчистить поля</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    reset({
                                        Height_N: 200,
                                        Width_M: 400,
                                        step_h: 0.4,
                                        monte_karlo_L: 100,
                                        speed_sound_c: 1500,
                                        damping_factor_mu: 0.018,
                                        scatt: 2,
                                    })
                                }

                                }
                            >По умолчанию</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    reset({
                                        Height_N: Math.floor(getRandomArbitrary(50, 500)),
                                        Width_M: Math.floor(getRandomArbitrary(50, 500)),
                                        step_h: (getRandomArbitrary(0.001, 1)).toFixed(4),
                                        monte_karlo_L: Math.floor(getRandomArbitrary(1, 100)),
                                        speed_sound_c: Math.floor(getRandomArbitrary(200, 6000)),
                                        damping_factor_mu: (getRandomArbitrary(0, 1)).toFixed(4),
                                        scatt: Math.floor(getRandomArbitrary(1, 10)),
                                    })
                                }
                                }
                            >Случайные числа</Button>
                        </Grid>
                    </Grid>


                </form>
                <div className="blockImg">
                    {/*<CanvasComp data={result} height={heightValue} width={widthValue}/>*/}
                    <p>{result}</p>
                </div>
            </div>
        );
    }
;
export default Comp1;