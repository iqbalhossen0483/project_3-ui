import { transitions, positions, Provider as AlertProvider } from 'react-alert'

const AlartProvider = ({ children }) => {
    const AlertTemplate = ({ message }) => (
        <div className="bg-green-100 font-semibold text-xl mt-20 px-20 py-1 rounded-md">
            {message}
        </div>
    )
    const options = {
        position: positions.TOP_CENTER,
        timeout: 5000,
        offset: '20px',
        transition: transitions.SCALE
    }
    return <AlertProvider template={AlertTemplate} {...options}>
        {children}
    </AlertProvider>
};

export default AlartProvider;