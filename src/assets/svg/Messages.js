import { Path, Svg } from "react-native-svg"

export const Messages = ({ fill }) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M17 9C17 12.87 13.64 16 9.5 16L8.57001 17.12L8.02 17.78C7.55 18.34 6.65 18.22 6.34 17.55L5 14.6C3.18 13.32 2 11.29 2 9C2 5.13 5.36 2 9.5 2C12.52 2 15.13 3.67001 16.3 6.07001C16.75 6.96001 17 7.95 17 9Z" stroke={fill ? fill : 'black'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M22.0001 12.86C22.0001 15.15 20.8201 17.1801 19.0001 18.4601L17.6601 21.41C17.3501 22.08 16.4501 22.2101 15.9801 21.6401L14.5001 19.86C12.0801 19.86 9.92007 18.7901 8.57007 17.1201L9.50006 16.0001C13.6401 16.0001 17.0001 12.8701 17.0001 9.00006C17.0001 7.95006 16.7501 6.96007 16.3001 6.07007C19.5701 6.82007 22.0001 9.58005 22.0001 12.86Z" stroke={fill ? fill : 'black'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M7 9H12" stroke={fill ? fill : 'black'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    )
}