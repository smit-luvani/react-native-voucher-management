import Toast from 'react-native-simple-toast';

const showToast = (message) => {
    return Toast.show(message || 'Something wrong', Toast.LONG, { backgroundColor: 'red', color: 'white' });
    // return toast.show(message || 'Something went wrong!');
}

export default showToast;