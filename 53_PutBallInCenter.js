'use strict';
/* By Ekaterina Khorina */

let ball = document.querySelector('#ball');
let field = document.querySelector('#field');

const centerBallX = ball.clientWidth / 2;
const centerBallY = ball.clientHeight / 2;

const centerFieldX = field.clientWidth /2;
const centerFieldY = field.clientHeight /2;

ball.style.marginLeft = (centerFieldX - centerBallX) + 'px';
ball.style.marginTop = (centerFieldY - centerBallY) + 'px';