import { ColorRing } from 'react-loader-spinner'


import BasicTabs from './common/Tabs';


export default function SpendingTrend() {

    return (
        <div>
            {/* {query.isLoading && <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <ColorRing />    
            </div>} */}

            <BasicTabs />
        </div>
    )
}