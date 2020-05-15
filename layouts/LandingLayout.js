import FirebaseProvider from '../utils/firebase'
import Link from 'next/link'

export default ({children, setUser}) => {
  return (
    <FirebaseProvider>
      <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
        <div className="flex w-full h-full p-4">
          <div className="flex flex-grow -mx-2">
            <div className='flex w-full px-2'>
              <div className="flex-grow">
                <div className="flex bg-gray-200 w-full h-full">
                  { children }
                  <div>
                    <div className="line-through text-gray-400 fixed top-0 left-0 m-6">Search</div>
                    <div className="fixed bottom-0 left-0 m-6">
                      <a  href={'http://estudioherreros.com/en/'}>estudio Herreros ↗</a>
                    </div>
                    <div className="line-through text-gray-400 fixed top-0 right-0 m-6">Lang</div>
                    <div className="fixed bottom-0 right-0 m-6">
                      <Link href={{pathname: '/who'}}>
                        <a>
                          Who
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </FirebaseProvider>
  )
}