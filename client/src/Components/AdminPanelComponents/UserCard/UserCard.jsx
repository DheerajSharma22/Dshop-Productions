import React from 'react'
import styles from './UserCard.module.css';
import userImg from '../../../Images/user.png';

const UserCard = ({user}) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.bgWrapper}></div>
      <div className={styles.imgWrapper}>
        <img src={userImg} alt="" />
      </div>
      <div className={styles.bodyWrapper}>
        <h3>{user.name}</h3>
        <p>{user.isAdmin ? "admin" : "customer"}</p>
        <p className={styles.email}>{user.email}</p>
      </div>
    </div>
  )
}

export default UserCard
