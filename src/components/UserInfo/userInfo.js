import "./userInfo.scss"
import "../../styles/global.scss";

export function setUpUserInfo(user) {
  const divInfo = document.createElement("div");
  divInfo.classList.add("divInfo")

  const userImg = document.createElement("img");
  userImg.src = user.profile_image.small;

  const userName = document.createElement("span");
  userName.textContent = user.name;

  divInfo.append(userImg);
  divInfo.append(userName);

  return divInfo;
}
