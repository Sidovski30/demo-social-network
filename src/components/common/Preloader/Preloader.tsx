import { Spin } from 'antd'
import React from 'react'

const Preloader: React.FC = () => (
    <div style={{ 
        position: 'fixed',
        insetInlineEnd: 0,
        height: '100vh',
        width: '100vw',
        textAlign: 'center',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 9999,
        verticalAlign: 'center',
        alignItems: 'center'
    }}>
        <Spin />
    </div>
)

export default Preloader
