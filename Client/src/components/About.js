import React,{useEffect,useState} from 'react'
import dp from '../images/dp.jpg';
import meme from '../images/meme.jpg';
import edit from '../images/edit.jpg';
import Cookies from 'js-cookie';
import { NavLink,useHistory } from 'react-router-dom'
function About() {

	const history = useHistory();
  const [userData, setUserData] = useState({});


  const callAboutPage = async () => {
    try {
		const jwt=Cookies.get('jwt');
      const res = await fetch("http://localhost:5000/about", {
        method: "GET",
        headers: {
			"Authorization":"Bearer " +jwt,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <div>
		
          <h2>About Me</h2>
<div id="myCarousel" class="carousel slide" data-ride="carousel">
	
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
		<li data-target="#myCarousel" data-slide-to="2"></li>
	</ol>   

	<div class="carousel-inner">		
		<div class="carousel-item active">
			<div class="img-box"><img src={dp} alt=""/></div>
			<p class="testimonial">I am a B.tech C.S.E student at KGEC.</p>
			<p class="overview"><b>{userData.name}</b>{userData.work} at <NavLink to="#">KGEC</NavLink></p>
			<p class="overview"><b>id:
			{userData._id}</b>phone: {userData.phone} at <NavLink to="#">KGEC</NavLink></p>
			<div class="star-rating">
				<ul class="list-inline">
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star-o"></i></li>
				</ul>
			</div>
		</div>
		<div class="carousel-item">
			<div class="img-box"><img src={edit} alt=""/></div>
			<p class="testimonial">I am intrested in {userData.name} development.</p>
			<p class="overview"><b>{userData.name} </b>{userData.work} at  <NavLink to="#">KGEC</NavLink></p>
			<div class="star-rating">
				<ul class="list-inline">
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star-o"></i></li>
				</ul>
			</div>
		</div>
		<div class="carousel-item">
			<div class="img-box"><img src={meme} alt=""/></div>
			<p class="testimonial">I am currently in 2nd year and pursuing btech 4 year Btech degree</p>
			<p class="overview"><b>{userData.name}</b>{userData.work} <NavLink to="#">Web Team</NavLink></p>
			
			<div class="star-rating">
				<ul class="list-inline">
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star"></i></li>
					<li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>
				</ul>
			</div>
		</div>		
	</div>

	<a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
		<i class="fa fa-angle-left"></i>
	</a>
	<a class="carousel-control-next" href="#myCarousel" data-slide="next">
		<i class="fa fa-angle-right"></i>
	</a>
</div>

        </div>
    )
}

export default About
