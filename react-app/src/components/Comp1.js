import React, {useState} from 'react';
import {TextField, Button, Grid} from "@mui/material";
import '../styles/Comp1.css'
import {useForm} from "react-hook-form";
import {DevTool} from '@hookform/devtools'
import Tooltip from '@mui/material/Tooltip';

const Comp1 = () => {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    const {register, handleSubmit, reset, control, formState: {errors}} = useForm({
        defaultValues: {
            Height_N: 200,
            Width_M: 400,
            step_h: 0.4,
            monte_karlo_L: 100,
            speed_sound_c: 1500,
            damping_factor_μ: 0.018,
            scatt: 2,
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
                            {...register('damping_factor_μ', registerOptions.damping_factor_μ)}
                            error={!!errors.damping_factor_μ}
                            helperText={errors?.damping_factor_μ && errors.damping_factor_μ?.message}
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
                <Grid container spacing={4}>
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
                                    damping_factor_μ: "",
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
                                    damping_factor_μ: 0.018,
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
                                    damping_factor_μ: (getRandomArbitrary(0, 1)).toFixed(4),
                                    scatt: Math.floor(getRandomArbitrary(1, 10)),
                                })
                            }

                            }
                        >Случайные числа</Button>
                    </Grid>
                </Grid>


            </form>
            <DevTool control={control}/>
        </div>
    );
};
export default Comp1;