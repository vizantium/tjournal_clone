import React from "react";
import {Button} from "@material-ui/core";

interface MainFormProps {
    setFormType: (string) => void
}

export const MainForm:React.FC<MainFormProps> = ({setFormType}) => {
    return (
        <div>
            <Button className={'mb-15'} variant={'contained'} fullWidth>Vkontakte</Button>
            <Button className={'mb-15'} variant={'contained'} fullWidth>Google</Button>
            <Button onClick={() => setFormType('login')} className={'mb-15'} variant={'contained'} fullWidth>Email</Button>
        </div>
    )
}