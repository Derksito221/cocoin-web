'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
}

export default function AdUnit({ 
  adSlot, 
  adFormat = 'auto',
  style = { display: 'block' },
  className = ''
}: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        // @ts-ignore
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('Error loading AdSense:', error)
    }
  }, [])

  return (
    <div className={`ad-unit ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-4297167192050875"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

