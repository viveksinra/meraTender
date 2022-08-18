import React, { useState, Fragment, useRef } from "react";
// import Chat from "https://qualifier.co.in/static/media/Chat.71331b0c.svg";
// import MySnackbar from "../Components/MySnackbar";
import {  Grid, Paper, Card, Container, Divider, TextField, Fab, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import axios from "axios";
import StaticAppBar from "./Component/StaticAppBar";

// <!--Start of Tawk.to Script-->
// <script type="text/javascript">
// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// (function(){
// var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
// s1.async=true;
// s1.src='https://embed.tawk.to/5e270a298e78b86ed8aa5fd2/default';
// s1.charset='UTF-8';
// s1.setAttribute('crossorigin','*');
// s0.parentNode.insertBefore(s1,s0);
// })();
// </script>
// Direct Chat Link : https://tawk.to/chat/5e270a298e78b86ed8aa5fd2/default
// <!--End of Tawk.to Script-->
const useStyles = makeStyles(() => ({
	contactTopBg: {
		backgroundColor: "#ffffff",
		paddingTop: 12,
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2348fcff'/%3E%3Cstop offset='1' stop-color='%238eff8c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23a44fff' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E\")",
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
		fontSize: "2rem",
		textAlign: "center",
		height: "20vh",
	},
	container: {
		marginTop: -10,
		padding: 2,
	},
	form: {
		padding: 2,
		border: "1px solid rgba(33,150,243,0.3)",
		maxWidth: "410px",
	},
}));

export default function ProContact() {
	const classes = useStyles();
	const [name, setName] = useState("");
	const [mobile, setMobile] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const snackRef = useRef();
	document.title = "Contact Us : Qualifier - Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";

	const handleSubmit = async (e) => {
		e.preventDefault();
		let data = { name, mobile, email, subject, message };
		await axios
			.post("/api/other/contactus", data)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
			})
			.catch((err) => console.log(err));
		setName("");
		setMobile("");
		setEmail("");
		setSubject("");
		setMessage("");
	};
	const data = [
		// { title: "Registered Office", value: "47, Qualifier Building, Tollygunge, Kolkata - India" },
		{ title: "Email", value: "support@meratender.com" },
		{ title: "Phone No. ", value: "8084452610" },
		{ title: "Address ", value: "67, Marvari Patti, Boring Canal Road - Patna, Pin Code - 800001" },
	];
	return (
		<StaticAppBar>		<Fragment>
	
			<div className={classes.contactTopBg}>Contact Us </div>
			<Container className={classes.container}>
				<Paper>
					<Grid container justify="center" spacing={4}>
						<Grid item xs={12} md={6} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<img src={"https://qualifier.co.in/static/media/Chat.71331b0c.svg"} alt="Contact-Svg" />

							<a target="_blank" rel="noopener noreferrer" href="https://tawk.to/chat/5e270a298e78b86ed8aa5fd2/default">
								<Fab size="medium" color="secondary" variant="extended">
									Start Chat Now
								</Fab>
							</a>
							<br />
							<Divider />
							<ul style={{ listStyleImage: "url('https://res.cloudinary.com/qualifier/image/upload/v1585479266/Default/check-mark_zbl05t.svg')" }}>
								{data.map((d) => (
									<li key={d.title}>
										<Typography color="textSecondary">
											{d.title} : {d.value}
										</Typography>
									</li>
								))}
							</ul>
						</Grid>

						<Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "center" }}>
							<Card elevation={3} className={classes.form}>
								<form onSubmit={(e) => handleSubmit(e)}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<TextField
												variant="outlined"
												required
												fullWidth
												autoFocus
												label="Full Name"
												placeholder="Name..."
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												variant="outlined"
												required
												type="number"
												label="Mobile No."
												placeholder="Enter 10 Digit Number"
												value={mobile}
												onChange={(e) => setMobile(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												variant="outlined"
												required
												type="email"
												label="Email Id"
												placeholder="Enter your Email Id"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												variant="outlined"
												required
												label="Subject"
												placeholder="Enter the Title / Subject"
												value={subject}
												onChange={(e) => setSubject(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												multiline
												rows={4}
												fullWidth
												variant="outlined"
												required
												label="Message"
												placeholder="Type the message here..."
												value={message}
												onChange={(e) => setMessage(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<center>
												<Fab type="submit" size="medium" variant="extended" color="primary">
													Send Now
												</Fab>
											</center>
										</Grid>
									</Grid>
								</form>
							</Card>
						</Grid>
					</Grid>
				</Paper>
			</Container>
			{/* <MySnackbar ref={snackRef} /> */}
		</Fragment> </StaticAppBar>

	);
}