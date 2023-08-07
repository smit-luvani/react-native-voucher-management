import { Path, Svg } from "react-native-svg"

export const Home = ({ fill }) => {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8.07861 15.1355H13.8936" stroke={fill ? fill : "white"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M1.3999 12.713C1.3999 7.082 2.0139 7.475 5.3189 4.41C6.7649 3.246 9.0149 1 10.9579 1C12.8999 1 15.1949 3.235 16.6539 4.41C19.9589 7.475 20.5719 7.082 20.5719 12.713C20.5719 21 18.6129 21 10.9859 21C3.3589 21 1.3999 21 1.3999 12.713Z" stroke={fill ? fill : "white"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    )
}