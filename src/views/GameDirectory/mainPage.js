
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TicTacToe } from '../Games/ticTacToe';
import Lottie from 'react-lottie';
import animationData from './hamster.json'
import './mainPage.css'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
export const MainPage = () => {
  const [renderGame, setRenderGame] = useState(false)
  const [displayLoadingScreen, setDisplayLoadingScreen] = useState(false)

  const startGame = () => {
    setRenderGame(true)
    setDisplayLoadingScreen(false)
  }
  return(
    <>
      <div className="main-page">
        {!renderGame && !displayLoadingScreen &&
          <>
            <h1>Would you like to play a game?</h1>
            <Button className='main success' onClick={() => startGame()}>YES</Button>
            <Button className='main warning' onClick={() => setDisplayLoadingScreen(true)}>NO</Button>
          </>
        }
      </div>
      {renderGame && <TicTacToe/>}
      {displayLoadingScreen && <div className="loading-screen">
        {
          <div className="elements">
            <Lottie options={defaultOptions} height={400} width={400} />
            <p className='loading-text'>I'm bored. Let's play Tic Tac Toe.</p>
            <Button className='main success new-game' onClick={() => startGame()}>Play Game</Button>
          </div>
        }
      </div>}
    </>
  )
}