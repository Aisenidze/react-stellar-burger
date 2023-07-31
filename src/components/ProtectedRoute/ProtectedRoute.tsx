import { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../services/types";

export const ProtectedRoute: FC<{ children: React.ReactNode, path: string }> = ({ children, ...props }) => {
    const isAuthChecked = useAppSelector(state => state.user.isAuthChecked);
    const user = useAppSelector(state => state.user.userData.name);

    return (
        <Route
            {...props}
            render={({ location }) => (
                isAuthChecked && user
                    ? (children)
                    : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                        />
                    )
            )}
        />
    );

}
