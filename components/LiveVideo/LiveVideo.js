import React, { useEffect, useState, useCallback } from 'react'
import Call from './Call'

export default function LiveVideo({showVideo}) {
  // Show the call UI if we're either joining, already joined, or are showing an error.
  // const showCall = ['STATE_JOINING', 'STATE_JOINED', 'STATE_ERROR'].includes(appState)


  return <Call showVideo={showVideo} />
}
