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
        <a href="https://jesse-mccormick.com/">Jesse Liam McCormick, TA</a>
        <a href="https://database.dpa-etsam.com/1163-2">Esteban Salcedo (eH), Collaborator</a>
        <a href="https://portfolio.carstenrod.in/">Carsten Rodin, Site Design & Development</a>
        </div>
        <style jsx>{`
          a {
            display: block;
          }
        `}</style>
      </div>
  )
}

Who.Layout = LandingLayout

export default Who;