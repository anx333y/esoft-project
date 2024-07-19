import "./NewsQuickSearchForm.css";
import { Search } from "@mui/icons-material";
import { InputAdornment, OutlinedInput } from "@mui/material";

import { useForm } from "react-hook-form";

import RHFInput from "../../../ui/react-hook-form/RHFInput";

import { INewsQuickSearchFormProps } from "../../../../types";

const NewsQuickSearchForm = ({setQuickSearchParams}: INewsQuickSearchFormProps) => {
	const {
		formState: {
			errors
		},
		handleSubmit,
		control,
	} = useForm({
		mode: 'onChange'
	});

	const onSubmitForm = (data: any) => {
		setQuickSearchParams({
			quickSearchValue: data.quickSearchValue
		})
	};

	return (
		<form className="news-quick-search-form" onChange={handleSubmit(onSubmitForm)}>
			<RHFInput
				name="quickSearchValue"
				control={control}
				errors={errors}
				isRequired={false}
				placeholder="Быстрый поиск..."
				renderComponent={
					<OutlinedInput
						size="small"
						type="search"
						sx={{
							
							boxShadow: "0 2px 6px 2px rgba(0, 0, 0, 0.1)",
							"&.MuiInputBase-root": {
								borderRadius: "8px",
								bgcolor: "#fff",
							},
							'&:hover:not(:focus)': {
								'.MuiOutlinedInput-notchedOutline': {
									borderColor: '#ECF2FF',
									borderWidth: '2px',
								}
							},
							'.MuiOutlinedInput-notchedOutline': {
								borderColor: "transparent"
							}
						}}
						notched={false}
						color="secondary"
						startAdornment={
							<InputAdornment position="start">
								<Search color="secondary" />
							</InputAdornment>
						}
					/>
				}
			/>
		</form>
	)
};

export default NewsQuickSearchForm;