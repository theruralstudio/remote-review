import dynamic from 'next/dynamic'

import NavPublic from '../components/ReviewUI/NavPublic'
import RegisterPanel from '../components/RegisterPanel'
import TablePanel from '../components/Table/TablePanel'

// load video panel client-side only
const LiveVideoNoSSR = dynamic(() => import('./LiveVideo/LiveVideo'), {
  ssr: false
}) 

export default function ReviewFrame({user, setUser, view, setView, url}) {
  const reviewPanel = {
    'register': <RegisterPanel currentUser={user} setUser={setUser} setView={setView}/>,
    // 'chat': <ChatPanel currentUser={user} />,
    'stream': <LiveVideoNoSSR url={url} currentUser={user} setView={setView} />,
    'table': <TablePanel currentUser={user} setView={setView} />
  }

  return (
    <div className='flex w-3/5 px-2 h-full'>
      <div className='flex-grow flex flex-col relative'>
        { reviewPanel[view] }
        <NavPublic view={view} setView={setView}/>
      </div>
    </div>    
  )
}