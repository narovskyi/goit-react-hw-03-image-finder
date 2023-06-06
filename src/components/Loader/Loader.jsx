import { ThreeDots } from 'react-loader-spinner'

const Loader = () => (
    <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#757575" 
        ariaLabel="three-dots-loading"
        visible={true}
        wrapperStyle={{
            display: 'block',
            textAlign: 'center'
        }}
    />
);

export default Loader;