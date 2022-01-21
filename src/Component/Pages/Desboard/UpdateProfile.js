import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFirebase from "../../Hook/useFirebase";

function UpdateProfile() {
    const { register, handleSubmit } = useForm();
    const { user } = useFirebase();
    const alert = useAlert();
    const navigate = useNavigate();

    const onSubmit = userInfo => {
        const formData = new FormData();
        formData.append("district", userInfo.district);
        formData.append("policeStation", userInfo.policeStation);
        formData.append("rodeOrVillage", userInfo.rodeOrVillage);
        formData.append("phone", userInfo.phone);
        formData.append("email", user.email);
        if (user.imgId) {
            formData.append("existingImg", user.imgId);
        }
        formData.append("profile", userInfo.profile[0]);

        fetch(`https://cycle-mart.herokuapp.com/users/updateUser`, {
            method: "PUT",
            body: formData
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert.show("Update successfull");
                    navigate("/my-account/profile");
                }
            })
            .catch(err=>console.log("err",err))
    }

    return ( 
        <form
            className="container"
            onSubmit={handleSubmit(onSubmit)}>
            <input
                className="input my-2"
                {...register("district")}
                placeholder="Your Dristrict"
            />
            <input
                className="input my-2"
                {...register("policeStation")}
                placeholder="Police Station"
            />
            <input
                className="input my-2"
                {...register("rodeOrVillage")}
                placeholder="Rode No. / Village name"
            />
            <input
                className="input my-2"
                {...register("phone")}
                placeholder="Phone number"
                type="number"
            />
            <input
                className="input my-2"
                {...register("profile")}
                type="file"
            />
      
            <input className="button" type="submit" />
        </form>
    );
}

export default UpdateProfile;