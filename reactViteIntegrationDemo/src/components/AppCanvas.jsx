import React, { useRef, useEffect } from 'react'

import { JEELIZVTO, JEELIZVTOWIDGET } from 'jeelizvtowidget'
//import { JEELIZVTO, JEELIZVTOWIDGET } from '../../../../../npm/package/index.js'


import searchImage from '../assets/target.png'



function init_VTOWidget(placeHolder, canvas, toggle_loading){
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: toggle_loading.bind(null, true),
      LOADING_END: toggle_loading.bind(null, false)
    },
    sku: 'empty', // SKU loadded at the beginning
    // image displayed when face is not found:
    searchImageMask: searchImage, //'https://appstatic.jeeliz.com/jeewidget/images/target.png',
    searchImageColor: 0xeeeeee, // color of loading (face not found) animation
    searchImageRotationSpeed: -0.001, // negative -> clockwise
    callbackReady: function(){
      console.log('INFO: JEELIZVTOWIDGET is ready :)')
    },
    onError: function(errorLabel){ // this function catches errors, so you can display custom integrated messages
      alert('An error happened. errorLabel =' + errorLabel)
      switch(errorLabel) {
        case 'WEBCAM_UNAVAILABLE':
          // the user has no camera, or does not want to share it.
          break

        case 'INVALID_SKU':
          // the provided SKU does not match with a glasses model
          break

        case 'PLACEHOLDER_NULL_WIDTH':
        case 'PLACEHOLDER_NULL_HEIGHT':
          // Something is wrong with the placeholder
          // (element whose id='JeelizVTOWidget')
          break
          
        case 'FATAL':
        default:
          // a bit error happens:(
          break
      } // end switch
    } // end onError()
  }) // end JEELIZVTOWIDGET.start call
}


function AppCanvas(props){
  const refPlaceHolder = useRef()
  const refCanvas = useRef()
  const refAdjustEnter = useRef()
  const refAdjust = useRef()
  const refChangeModel = useRef()
  const refLoading = useRef()

  const toggle_loading = (isLoadingVisible) => {
    refLoading.current.style.display = (isLoadingVisible) ? 'block' : 'none'
  }

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode()
    refAdjustEnter.current.style.display = 'none'
    refAdjust.current.style.display = 'block'
    refChangeModel.current.style.display = 'none'
  }

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode()
    refAdjustEnter.current.style.display = 'block'
    refAdjust.current.style.display = 'none'
    refChangeModel.current.style.display = 'block'
  }

  const set_glassesModel = (sku) => {
    JEELIZVTOWIDGET.load(sku)
  }

  useEffect(() => {
    const placeHolder = refPlaceHolder.current
    const canvas = refCanvas.current
    init_VTOWidget(placeHolder, canvas, toggle_loading)

    return () => {
      //JEELIZVTOWIDGET.destroy()
    }
  }, [])

  return (
    <div ref={refPlaceHolder} className='JeelizVTOWidget'>
      <canvas ref={refCanvas} className='JeelizVTOWidgetCanvas'></canvas>
      
      <div ref={refAdjustEnter} className='JeelizVTOWidgetControls'>
        <button className='JeelizVTOWidgetButton JeelizVTOWidgetAdjustEnterButton' onClick={enter_adjustMode}>
          Adjust
        </button>
      </div>

      <div ref={refAdjust} className='JeelizVTOWidgetAdjustNotice'>
        Move the glasses to adjust them.
        <button className='JeelizVTOWidgetButton JeelizVTOWidgetAdjustExitButton' onClick={exit_adjustMode}>
          Quit
        </button>
      </div>

      <div ref={refChangeModel} className='JeelizVTOWidgetControls JeelizVTOWidgetChangeModelContainer'>
        <button className='JeelizVTOWidgetButton' onClick={set_glassesModel.bind(this, 'rayban_aviator_or_vertFlash')}>Model 1</button>
        <button className='JeelizVTOWidgetButton' onClick={set_glassesModel.bind(this, 'rayban_round_cuivre_pinkBrownDegrade')}>Model 2</button>
        <button className='JeelizVTOWidgetButton' onClick={set_glassesModel.bind(this, 'carrera_113S_blue')}>Model 3</button>
      </div>

      <div ref={refLoading} className='JeelizVTOWidgetLoading'>
       <div className='JeelizVTOWidgetLoadingText'>
          LOADING...
        </div>
      </div>

    </div>
  )
}

export default AppCanvas
