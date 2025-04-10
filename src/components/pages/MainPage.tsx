import { Link } from 'react-router-dom';
import { routes } from '../routes';

export const MainPage = () => {
    // TODO add all links from sidebar to main page
    return (
        <div className="container-fluid p-3">
            <div className="card">
                <h5 className="card-header">Placeholder</h5>
                <div className="card-body">
                    <h5 className="card-title">Placeholder title </h5>
                    <p className="card-text">Placeholder content</p>
                    <Link to={routes.pages.main()} className="btn btn-primary">
                        Placeholder
                    </Link>
                </div>
            </div>
        </div>
    );
};
