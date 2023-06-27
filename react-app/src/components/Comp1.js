import React from 'react';
import {Button, Grid, TextField} from "@mui/material";
import '../styles/Comp1.css'
import {useForm} from "react-hook-form";
import {DevTool} from '@hookform/devtools'
import Tooltip from '@mui/material/Tooltip';
import CanvasComp from "./CanvasComp";
import * as THREE from 'three';
import {Vector3} from "three";

const Comp1 = () => {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    function zadnitca() {
        let M = 400
        let N = 200

        let L = 5
        let scatt = 2
        let c = 250
        let sigmatimes = 5
        let mu = 0.018 * sigmatimes
        let h = 0.4
        let maximumGrad = 0.00001 * sigmatimes

        let vector_size = 3

        const m1 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m2 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m3 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m4 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m5 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m6 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m7 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m8 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m9 = new Array(N).fill().map(() => new Array(M).fill(0));
        const m10 = new Array(N).fill().map(() => new Array(M).fill(0));

        const SigmaR = new Array(N).fill().map(() => new Array(M).fill(0));

        const Imass = new Array(N).fill().map(() => new Array(M).fill(0));
        const I1mass = new Array(N).fill().map(() => new Array(M).fill(0));
        const I2 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I3 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I4 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I5 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I6 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I7 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I8 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I9 = new Array(N).fill().map(() => new Array(M).fill(0));
        const I10 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM1 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM2 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM3 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM4 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM5 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM6 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM7 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM8 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM9 = new Array(N).fill().map(() => new Array(M).fill(0));
        const GradM10 = new Array(N).fill().map(() => new Array(M).fill(0));


        class Rand191Bit {
            #X = [[], []];
            #m1 = 4294967087;
            #m2 = 4294944443;

            #val() {
                this.#X[0][0] = this.#mod(1403580 * this.#X[0][2] - 810728 * this.#X[0][3], this.#m1);
                this.#X[1][0] = this.#mod(527612 * this.#X[1][1] - 1370589 * this.#X[1][3], this.#m2);
                const z = this.#mod(this.#X[0][0] - this.#X[1][0], 4294967087);
                let u = 0;
                u = z / 4294967087;
                for (let i = 0; i < 2; i++) {
                    for (let j = 3; j > 0; j--) {
                        this.#X[i][j] = this.#X[i][j - 1];
                    }
                }
                return u;
            }

            constructor() {
                for (let i = 0; i < 1.0e6; i++) {
                }
                for (let i = 0; i < 2; i++) {
                    for (let j = 1; j < 4; j++) {
                        this.#X[i][j] = 564564541 + Math.floor(Math.random() * 2 ** 53);
                    }
                }
            }

            #mod(x, y) {
                return (y < 0 ? -y : y) && (x < 0 ? x % y + y : x % y);
            }

            getRandomValue(a, b) {
                return a + this.#val() * (b - a);
            }
        }


        //включения с центрами в z=0, один эллипс
        function Sigma(x1, y1, z1) {
            let y = new THREE.Vector3(x1, y1, z1);
            let a = new THREE.Vector3(-40, -20, 0);    //Vect a(-40, -20, 5);
            let f = new THREE.Vector3(20, 10, 10);        //Vect f(20, 10, 20);
            let b = new THREE.Vector3(40, -40, 0);    //Vect b(40, -40, 40);
            let e = new THREE.Vector3(-55, -40, 0);    //Vect e(-55, -40, 0);
            let p = new THREE.Vector3(-45, -75, 0);    //Vect p(-45, -75, 60);
            let q = new THREE.Vector3(60, -50, 0);    //Vect q(60, -50, 75);

            let onebubble = new THREE.Vector3(-70, -65, 0);        //Vect onebubble(-70, -65, 20);
            let twobubble = new THREE.Vector3(-60, -70, 0);        //Vect twobubble(-60, -70, 40);
            let threebubble = new THREE.Vector3(-40, -75, 0);        //Vect threebubble(-40, -75, 60);
            let fourbubble = new THREE.Vector3(5, -70, 0);        //Vect fourbubble(5, -70, 70);
            let fivebubble = new THREE.Vector3(20, -65, 0);        //Vect fivebubble(20, -65, 50);
            let sixbubble = new THREE.Vector3(55, -75, 0);        //Vect sixbubble(55, -75, 30);

            let toponebubble = new THREE.Vector3(-76, -5, 0);        //Vect toponebubble(-76, -5, 30);
            let toptwobubble = new THREE.Vector3(-68, -2, 0);        //Vect toptwobubble(-68, -2, 50);
            let topthreebubble = new THREE.Vector3(-35, -6, 0);    //Vect topthreebubble(-35, -6, 60);
            let topfourbubble = new THREE.Vector3(5, -3, 0);        //Vect topfourbubble(5, -3, 20);
            let topfivebubble = new THREE.Vector3(25, -9, 0);        //Vect topfivebubble(25, -9, 40);
            let topsixbubble = new THREE.Vector3(72, -6, 0);        //Vect topsixbubble(72, -6, 70);

            let mediumonebubble = new THREE.Vector3(-75, -40, 0);        //Vect mediumonebubble(-75, -40, 10);
            let mediumtwobubble = new THREE.Vector3(-60, -50, 0);        //Vect mediumtwobubble(-60, -50, 20);
            let mediumthreebubble = new THREE.Vector3(-45, -45, 0);    //Vect mediumthreebubble(-45, -45, 0);


            let inclus1 = Math.sqrt(Math.pow((y.getComponent(0) + a.getComponent(0)), 2) / Math.pow(f.getComponent(0), 2) +
                Math.pow((y.getComponent(1) + a.getComponent(1)), 2) / Math.pow(f.getComponent(1), 2) +
                Math.pow((y.getComponent(2) + a.getComponent(2)), 2) / Math.pow(f.getComponent(2), 2));
            let inclus2 = Math.sqrt(Math.pow((y.getComponent(0) + b.getComponent(0)), 2) + Math.pow((y.getComponent(1) + b.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + b.getComponent(2)), 2));
            let inclus3 = Math.sqrt(Math.pow((y.getComponent(0) + e.getComponent(0)), 2) + Math.pow((y.getComponent(1) + e.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + e.getComponent(2)), 2));
            let inclus4 = Math.sqrt(Math.pow((y.getComponent(0) + p.getComponent(0)), 2) + Math.pow((y.getComponent(1) + p.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + p.getComponent(2)), 2));
            let inclus5 = Math.sqrt(Math.pow((y.getComponent(0) + q.getComponent(0)), 2) + Math.pow((y.getComponent(1) + q.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + q.getComponent(2)), 2));

            let inc1 = Math.sqrt(Math.pow((y.getComponent(0) + onebubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + onebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + onebubble.getComponent(2)), 2));
            let inc2 = Math.sqrt(Math.pow((y.getComponent(0) + twobubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + twobubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + twobubble.getComponent(2)), 2));
            let inc3 = Math.sqrt(Math.pow((y.getComponent(0) + threebubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + threebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + threebubble.getComponent(2)), 2));
            let inc4 = Math.sqrt(Math.pow((y.getComponent(0) + fourbubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + fourbubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + fourbubble.getComponent(2)), 2));
            let inc5 = Math.sqrt(Math.pow((y.getComponent(0) + fivebubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + fivebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + fivebubble.getComponent(2)), 2));
            let inc6 = Math.sqrt(Math.pow((y.getComponent(0) + sixbubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + sixbubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + sixbubble.getComponent(2)), 2));

            let topinc1 = Math.sqrt(Math.pow((y.getComponent(0) + toponebubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + toponebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + toponebubble.getComponent(2)), 2));
            let topinc2 = Math.sqrt(Math.pow((y.getComponent(0) + toptwobubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + toptwobubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + toptwobubble.getComponent(2)), 2));
            let topinc3 = Math.sqrt(
                Math.pow((y.getComponent(0) + topthreebubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + topthreebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + topthreebubble.getComponent(2)), 2));
            let topinc4 = Math.sqrt(
                Math.pow((y.getComponent(0) + topfourbubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + topfourbubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + topfourbubble.getComponent(2)), 2));
            let topinc5 = Math.sqrt(
                Math.pow((y.getComponent(0) + topfivebubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + topfivebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + topfivebubble.getComponent(2)), 2));
            let topinc6 = Math.sqrt(Math.pow((y.getComponent(0) + topsixbubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + topsixbubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + topsixbubble.getComponent(2)), 2));

            let mediuminc1 = Math.sqrt(
                Math.pow((y.getComponent(0) + mediumonebubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + mediumonebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + mediumonebubble.getComponent(2)), 2));
            let mediuminc2 = Math.sqrt(
                Math.pow((y.getComponent(0) + mediumtwobubble.getComponent(0)), 2) + Math.pow((y.getComponent(1) + mediumtwobubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + mediumtwobubble.getComponent(2)), 2));
            let mediuminc3 = Math.sqrt(Math.pow((y.getComponent(0) + mediumthreebubble.getComponent(0)), 2) +
                Math.pow((y.getComponent(1) + mediumthreebubble.getComponent(1)), 2) +
                Math.pow((y.getComponent(2) + mediumthreebubble.getComponent(2)), 2));
            //Верхние пузырьки
            if (topinc1 < 3)
                return (mu * 0.1 + 0.004) * sigmatimes;
            if (topinc2 < 1.5)
                return (mu * 0.2 + 0.001) * sigmatimes;
            if (topinc3 < 4)
                return (mu * 0.2 - 0.0016) * sigmatimes;
            if (topinc4 < 2.6)
                return (mu * 0.1 + 0.0032) * sigmatimes;
            if (topinc5 < 4.5)
                return (mu * 0.1 + 0.0025) * sigmatimes;
            if (topinc6 < 2.3)
                return (mu * 0.2 + 0.0018) * sigmatimes;
            //маленькие пузырьки в среднем слое
            if (mediuminc1 < 2)
                return (mu * 0.1 + 0.003) * sigmatimes;
            if (mediuminc2 < 2.6)
                return (mu * 0.2 - 0.001) * sigmatimes;
            if (mediuminc3 < 3.2)
                return (mu * 0.1 + 0.0014) * sigmatimes;
            //Основные неоднородности
            if (inclus1 < 1)
                return mu;
            if (inclus2 < 4.5)
                return mu * 0;
            if (inclus3 < 3.5)
                return mu * 0;
            if (inclus4 < 3)
                return mu * 0;
            if (inclus5 < 3)
                return mu * 0;
            //Маленькие пузырьки в нижнем слое
            if (inc1 < 5)
                return (mu * 0.2 + 0.0022) * sigmatimes;
            if (inc2 < 3.5)
                return (mu * 0.2 - 0.001) * sigmatimes;
            if (inc3 < 2.5)
                return (mu * 0.1 + 0.002) * sigmatimes;
            if (inc4 < 4)
                return (mu * 0.1 + 0.0032) * sigmatimes;
            if (inc5 < 2.62)
                return (mu * 0.2 + 0.0019) * sigmatimes;
            if (inc6 < 3)
                return (mu * 0.1 + 0.0018) * sigmatimes;
            //Основной
            return mu * 0.1;
        }


        function TauF(r, k, s) {                //функ-ия тау
            let n = 0
            let d = 0;
            let w = 0;
            n = (c * s) * (c * s) - Math.pow(r.length(), 2);
            d = (c * s) - r.dot(k);
            w = n / (2 * d);
            return w;
        }

        let value = new Rand191Bit();
        let g;

        let tmp = new THREE.Vector3();
        let r = new THREE.Vector3();
        let a = new THREE.Vector3();
        let w = new THREE.Vector3();

        let tau, teta = 1, t, t0, tprev;
        let I1 = 0;
        let sig = 0, fi, alpha, eps = h / 10;
        let result = 0, res = 0;
        let multiplier = 0;
        let denom = 0, numerator = 0;

        let error = new Array(scatt + 1).fill(0);
        let errorexact = new Array(scatt + 1).fill(0);
        let errormax = new Array(scatt + 1).fill(0);
        let reserrormax = new Array(scatt + 1).fill(0);
        let absoluterror = new Array(scatt + 1).fill(0);
        let scattering = new Array(scatt + 1).fill(0);
        let scatteringsum = new Array(scatt + 1).fill(0);
        let sigma = new Array(scatt + 1).fill(0);
        let difference = new Array(scatt + 1).fill(0) //--
        let gradSigma2 = new Array(scatt + 1).fill(0);  //--
        let oneabsoluterror = 0;

        let k = new THREE.Vector3();
        let kprev = new THREE.Vector3();
        let pointprev = new THREE.Vector3();
        let mult = 1;


        for (let i = 1; i < N; i++) {                            //по y
            r = new THREE.Vector3(-80, i * h, 0);
            for (let j = M - 1; j >= 0; j--) {                    //по x
                r.addScalar(h, 0);
                res = 0;
                mult = 1;
                for (let d = 1; d <= scatt; d++) {
                    scattering[d] = 0;
                    scatteringsum[d] = 0;
                }
                t0 = (2 * r.length()) / c;                //t0
                multiplier = c * Math.exp(-mu * c * t0) / (4 * Math.PI);
                for (let g = 0; g < L; g++) {                        //по Монте-Карло
                    t = t0;
                    let point = new THREE.Vector3(0, 0, 0);                        //r0
                    k = r.divideScalar(r.length()).negate();                    //k0
                    teta = 1;                                    //teta1
                    let tau = TauF(point, k, t);
                    a = point.sub(k.multiplyScalar(tau));
                    scattering[1] = Sigma(a.getComponent(0), a.getComponent(1), a.getComponent(2)) / (c * t - point.dot(k));
                    for (let s = 2; s <= scatt; s++) {            //по рассеяниям
                        tau = value.getRandomValue(0, TauF(point, k, t));
                        pointprev = point;
                        point = point.sub(k.multiplyScalar(tau));
                        kprev = k;
                        fi = value.getRandomValue(0, 2 * Math.PI);
                        alpha = value.getRandomValue(-1, 1);
                        k = new THREE.Vector3(Math.cos(fi) * Math.sqrt(1 - alpha * alpha), Math.sin(fi) * Math.sqrt(1 - alpha * alpha), alpha);
                        tprev = t;
                        t = t - tau / c;
                        teta = teta * Sigma(point.getComponent(0), point.getComponent(1), point.getComponent(2)) * TauF(pointprev, kprev, tprev);
                        a = point.sub(k.multiplyScalar(TauF(point, k, t)));
                        numerator = Sigma(a.getComponent(0), a.getComponent(1), a.getComponent(2));
                        w = k.multiplyScalar(c * t);
                        w = point.sub(w);
                        denom = w.length();
                        denom = denom * denom;
                        scattering[s] = scattering[s] + teta * numerator / denom;                    //отдельные результаты
                    }
                }
                scattering[1] = scattering[1] * 2 * multiplier;
                for (let d = 2; d <= scatt; d++) {
                    scattering[d] = scattering[d] * multiplier / L;
                }
                for (let d = 1; d <= scatt; d++)
                    scatteringsum[d] = scatteringsum[d - 1] + scattering[d];
                for (let d = 1; d <= scatt; d++) {
                    sigma[d] = (8 * Math.PI * r.length() * r.length() * scatteringsum[d]) /
                        (Math.exp(-2 * mu * r.length()) * c);
                    difference[d] = Math.abs(sigma[d] - Sigma(r.getComponent(0), r.getComponent(1), r.getComponent(2)));
                    errormax[d] = Math.abs(Sigma(r) - sigma[d]);    // maximum;
                    if (errormax[d] > reserrormax[d])
                        reserrormax[d] = errormax[d];
                }
                /*Сохранение результатов вычисления сигнала в массивы, для записи в файл*/
                I1mass[i][j] = scatteringsum[1];
                I2[i][j] = scatteringsum[2];
                I3[i][j] = scatteringsum[3];
                I4[i][j] = scatteringsum[4];
                I5[i][j] = scatteringsum[5];
                I6[i][j] = scatteringsum[6];
                I7[i][j] = scatteringsum[7];
                I8[i][j] = scatteringsum[8];
                I9[i][j] = scatteringsum[9];
                I10[i][j] = scatteringsum[10];
                Imass[i][j] = scatteringsum[scatt];
                m1[i][j] = sigma[1];
                m2[i][j] = sigma[2];
                m3[i][j] = sigma[3];
                m4[i][j] = sigma[4];
                m5[i][j] = sigma[5];
                m6[i][j] = sigma[6];
                m7[i][j] = sigma[7];
                m8[i][j] = sigma[8];
                m9[i][j] = sigma[9];
                m10[i][j] = sigma[10];
                SigmaR[i][j] = Sigma(r.getComponent(0), r.getComponent(1), r.getComponent(2));
            }
            // console.log(i);
        }
        //конец циклов по массиву

        /*Вывод результатов в файлы (In)*/
        console.log(Imass);


        //расчет модуля градиента в квадрате
        for (let i = 2; i < N - 1; i++) {
            for (let j = 1; j < M - 1; j++) {
                let Gradmass1 = (((m1[i + 1][j] - m1[i - 1][j]) * (m1[i + 1][j] - m1[i - 1][j])) +
                    ((m1[i][j + 1] - m1[i][j - 1]) * (m1[i][j + 1] - m1[i][j - 1])));
                GradM1[i][j] = (((m1[i + 1][j] - m1[i - 1][j]) * (m1[i + 1][j] - m1[i - 1][j])) +
                    ((m1[i][j + 1] - m1[i][j - 1]) * (m1[i][j + 1] - m1[i][j - 1]))) / maximumGrad;
                let Gradmass2 = (((m2[i + 1][j] - m2[i - 1][j]) * (m2[i + 1][j] - m2[i - 1][j])) +
                    ((m2[i][j + 1] - m2[i][j - 1]) * (m2[i][j + 1] - m2[i][j - 1])));
                GradM2[i][j] = (((m2[i + 1][j] - m2[i - 1][j]) * (m2[i + 1][j] - m2[i - 1][j])) +
                    ((m2[i][j + 1] - m2[i][j - 1]) * (m2[i][j + 1] - m2[i][j - 1]))) / maximumGrad;
                let Gradmass3 = (((m3[i + 1][j] - m3[i - 1][j]) * (m3[i + 1][j] - m3[i - 1][j])) +
                    ((m3[i][j + 1] - m3[i][j - 1]) * (m3[i][j + 1] - m3[i][j - 1])));
                GradM3[i][j] = (((m3[i + 1][j] - m3[i - 1][j]) * (m3[i + 1][j] - m3[i - 1][j])) +
                    ((m3[i][j + 1] - m3[i][j - 1]) * (m3[i][j + 1] - m3[i][j - 1]))) / maximumGrad;
                let Gradmass4 = (((m4[i + 1][j] - m4[i - 1][j]) * (m4[i + 1][j] - m4[i - 1][j])) +
                    ((m4[i][j + 1] - m4[i][j - 1]) * (m4[i][j + 1] - m4[i][j - 1])));
                GradM4[i][j] = (((m4[i + 1][j] - m4[i - 1][j]) * (m4[i + 1][j] - m4[i - 1][j])) +
                    ((m4[i][j + 1] - m4[i][j - 1]) * (m4[i][j + 1] - m4[i][j - 1]))) / maximumGrad;
                let Gradmass5 = (((m5[i + 1][j] - m5[i - 1][j]) * (m5[i + 1][j] - m5[i - 1][j])) +
                    ((m5[i][j + 1] - m5[i][j - 1]) * (m5[i][j + 1] - m5[i][j - 1])));
                GradM5[i][j] = (((m5[i + 1][j] - m5[i - 1][j]) * (m5[i + 1][j] - m5[i - 1][j])) +
                    ((m5[i][j + 1] - m5[i][j - 1]) * (m5[i][j + 1] - m5[i][j - 1]))) / maximumGrad;
                let Gradmass6 = (((m6[i + 1][j] - m6[i - 1][j]) * (m6[i + 1][j] - m6[i - 1][j])) +
                    ((m6[i][j + 1] - m6[i][j - 1]) * (m6[i][j + 1] - m6[i][j - 1])));
                GradM6[i][j] = (((m6[i + 1][j] - m6[i - 1][j]) * (m6[i + 1][j] - m6[i - 1][j])) +
                    ((m6[i][j + 1] - m6[i][j - 1]) * (m6[i][j + 1] - m6[i][j - 1]))) / maximumGrad;
                let Gradmass7 = (((m7[i + 1][j] - m7[i - 1][j]) * (m7[i + 1][j] - m7[i - 1][j])) +
                    ((m7[i][j + 1] - m7[i][j - 1]) * (m7[i][j + 1] - m7[i][j - 1])));
                GradM7[i][j] = (((m7[i + 1][j] - m7[i - 1][j]) * (m7[i + 1][j] - m7[i - 1][j])) +
                    ((m7[i][j + 1] - m7[i][j - 1]) * (m7[i][j + 1] - m7[i][j - 1]))) / maximumGrad;
                let Gradmass8 = (((m8[i + 1][j] - m8[i - 1][j]) * (m8[i + 1][j] - m8[i - 1][j])) +
                    ((m8[i][j + 1] - m8[i][j - 1]) * (m8[i][j + 1] - m8[i][j - 1])));
                GradM8[i][j] = (((m8[i + 1][j] - m8[i - 1][j]) * (m8[i + 1][j] - m8[i - 1][j])) +
                    ((m8[i][j + 1] - m8[i][j - 1]) * (m8[i][j + 1] - m8[i][j - 1]))) / maximumGrad;
                let Gradmass9 = (((m9[i + 1][j] - m9[i - 1][j]) * (m9[i + 1][j] - m9[i - 1][j])) +
                    ((m9[i][j + 1] - m9[i][j - 1]) * (m9[i][j + 1] - m9[i][j - 1])));
                GradM9[i][j] = (((m9[i + 1][j] - m9[i - 1][j]) * (m9[i + 1][j] - m9[i - 1][j])) +
                    ((m9[i][j + 1] - m9[i][j - 1]) * (m9[i][j + 1] - m9[i][j - 1]))) / maximumGrad;
                let Gradmass10 = (((m10[i + 1][j] - m10[i - 1][j]) * (m10[i + 1][j] - m10[i - 1][j])) +
                    ((m10[i][j + 1] - m10[i][j - 1]) * (m10[i][j + 1] - m10[i][j - 1])));
                GradM10[i][j] = (((m10[i + 1][j] - m10[i - 1][j]) * (m10[i + 1][j] - m10[i - 1][j])) +
                    ((m10[i][j + 1] - m10[i][j - 1]) * (m10[i][j + 1] - m10[i][j - 1]))) / maximumGrad;
                error[1] += Math.pow(Gradmass1 - Gradmass1, 2);
                error[2] += Math.pow(Gradmass1 - Gradmass2, 2);
                error[3] += Math.pow(Gradmass1 - Gradmass3, 2);
                error[4] += Math.pow(Gradmass1 - Gradmass4, 2);
                error[5] += Math.pow(Gradmass1 - Gradmass5, 2);
                error[6] += Math.pow(Gradmass1 - Gradmass6, 2);
                error[7] += Math.pow(Gradmass1 - Gradmass7, 2);
                error[8] += Math.pow(Gradmass1 - Gradmass8, 2);
                error[9] += Math.pow(Gradmass1 - Gradmass9, 2);
                error[10] += Math.pow(Gradmass1 - Gradmass10, 2);
                errorexact[1] += Math.pow(Gradmass1, 2);
                absoluterror[1] += Gradmass1;
                oneabsoluterror = absoluterror[1];
                absoluterror[2] += Gradmass2;
                absoluterror[3] += Gradmass3;
                absoluterror[4] += Gradmass4;
                absoluterror[5] += Gradmass5;
                absoluterror[6] += Gradmass6;
                absoluterror[7] += Gradmass7;
                absoluterror[8] += Gradmass8;
                absoluterror[9] += Gradmass9;
                absoluterror[10] += Gradmass10;
            }
            console.log(i);
        }
        /*Вычисление среднеквадратичной ошибки*/
        for (let s = 1; s <= scatt; s++) {
            error[s] = Math.sqrt(error[s] / errorexact[1]);
        }
        for (let s = 1; s <= scatt; s++) {
            absoluterror[s] = Math.abs(absoluterror[s] - oneabsoluterror);
        }

        /*Заполнение бинарного файла для отрисовки масивов с результатами расчета*/
        console.log(GradM10);


        /*Вывод в файл среднеквадратичной ошибки, максимальной ошибки и массив с результатом*/
        console.log("Standard deviation:	");
        console.log(error);
        return Imass
    }

    let Imass = zadnitca();
    console.log("zadnitca", Imass);


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
        // console.log(data);
        zadnitca();

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
            <CanvasComp
                data={Imass} width={400} height={200}/>
        </div>
    );
};
export default Comp1;