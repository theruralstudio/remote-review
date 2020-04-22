import { useRouter } from 'next/router';
import NavPublic from '../components/NavPublic';
import NavPersonal from '../components/NavPersonal';

export default function Reader({children, currentUser}) {

  const router = useRouter();

  return (
    <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
      <div className="flex w-full h-full p-4">
        <div className="flex flex-grow -mx-2">
          <div className="flex w-full px-2">
            <div className="flex-grow bg-white">
              {/* <NavPersonal currentUser={currentUser}/> */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}