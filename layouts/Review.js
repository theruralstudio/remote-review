import { useRouter } from 'next/router'
import NavPublic from '../components/NavPublic'
// import ChatPanel from '../components/ChatPanel'
import RegisterPanel from '../components/RegisterPanel'
import LiveVideo from '../components/LiveVideo'
import TablePanel from '../components/TablePanel'

// const TablePanelNoSSR = dynamic(
//   () => import('../components/TablePanel'),
//   { ssr: false }
// )

export default function Review({children, currentUser, numUsers, setView, setUser, streamUrl}) {

  const router = useRouter();

  const reviewPanel = {
    'register': <RegisterPanel currentUser={currentUser} setUser={setUser} />,
    // 'chat': <ChatPanel currentUser={currentUser} />,
    'stream': <LiveVideo url={streamUrl} currentUser={currentUser} />,
    'table': <TablePanel currentUser={currentUser} />
  }

  return (
    <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
      <div className="flex w-full h-full p-4">
        <div className="flex flex-grow -mx-2">
          <div className="flex w-2/5 px-2">
            <div className="flex-grow bg-white border-2 border-black">
              { children }
            </div>
          </div>
          <div className="flex w-3/5 px-2 h-full">
            <div className="flex-grow flex flex-col bg-white relative">
              <NavPublic setView={setView}/>
              { reviewPanel[router.query.view] }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

