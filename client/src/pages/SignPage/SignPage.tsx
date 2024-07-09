import SignForm from "../../components/bussiness/sign/SignForm/SignForm";
import "./SignPage.css";


type ISignPageProps = {
	type?: "in" | "up";
}

const SignPage = ({type = "up"}: ISignPageProps) => {
	return (
		<div className="sign-page">
			<SignForm type={type} />
		</div>
	)
};

export default SignPage;