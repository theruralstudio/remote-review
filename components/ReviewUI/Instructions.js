import React, {Component, useState, useEffect} from 'react'
import Link from 'next/link'
import Markdown from 'react-markdown'
import LandingLayout from '../../layouts/LandingLayout'

function Instructions(props) {
  const [mdText, setMdText] = useState('');

  useEffect(() => {
    fetch(`https://${process.env.bucketEndpoint}/${process.env.bucketName}/text/instructions.md`)
        .then((response) => {
            if (response.ok) return response.text();
            else return Promise.reject("Didn't fetch text correctly");
        })
        .then((text) => {
            setMdText(text);
        })
        .catch((error) => console.error(error));
  });

  return (
    <div className="absolute flex-grow gap-8 m-48 flex flex-col items-start z-50">
      <div className="bg-white self-stretch p-4 border-2 border-black shadow-2xl">
        <Markdown source={mdText} />
      </div>
      <div className="bg-white rounded-full p-2 px-4 mt-2 cursor-pointer border-2 border-black shadow-lg">
        <a onClick={props.toggleInstructions}>OK</a>
      </div>
    </div>
  )

}

Instructions.Layout = LandingLayout

export default Instructions;