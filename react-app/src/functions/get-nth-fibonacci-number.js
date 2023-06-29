function getNthFobonacciNumber(data) {
    let N = data.Height_N
    let M = data.Width_M
    let H = data.step_h
    let L = data.monte_karlo_L
    let c = data.speed_sound_c
    let mu = data.damping_factor_mu
    let scatt = data.scatt

    var res = Array.from(Array(500), () => new Array(500));
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            res[i][j] = (Math.floor(Math.random() * 10));
        }
    }
    return res;
}

export {getNthFobonacciNumber}

