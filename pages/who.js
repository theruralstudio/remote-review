import React, {Component, useState, useEffect} from 'react'
import Link from 'next/link'
import Markdown from 'react-markdown'
import LandingLayout from '../layouts/LandingLayout'

function Who() {
  const [mdText, setMdText] = useState('');

  useEffect(() => {
    fetch(`https://${process.env.bucketEndpoint}/${process.env.bucketName}/text/who.md`)
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
      <div className="flex-grow gap-8 m-48 flex flex-col items-start">
        <div className="bg-white rounded-full p-2 px-4 mb-4 cursor-pointer border-2 border-black">
          <Link href="/">
            <a>Back</a>
          </Link>
        </div>
        <div className="text-center bg-white self-stretch p-4 border-2 border-black">
        <p className="font-bold">
          <Link href="/juan_herreros">
            Juan Herreros, Professor of Professional Practice
          </Link>
        </p>
        <br></br>
        <p>Jesse Liam McCormick, TA</p>
        <p>Esteban Salcedo (eH), Collaborator</p>
        <p>Site by Carsten Rodin</p>
        </div>
      </div>
  )
}

Who.Layout = LandingLayout

export default Who;