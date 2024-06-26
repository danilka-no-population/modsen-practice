import './header.scss'
import {Link} from "react-router-dom";

export const Header = () => {

    return(
        <div className='wrapper'>
            <Link to={'/'}>
                <h1 className='wrapper__text'>Main page</h1>
            </Link>
        </div>
    );
}