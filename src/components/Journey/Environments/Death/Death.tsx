import styles from "./Death.module.css";

const Death = () => {
  return (
    <div className={`UI-element ${styles.deathScreen}`}>
      <h1>The cold embrace of death takes you.</h1>
      <p>
        Your body, after being stripped of it's belongings will lay there for
        weeks to come. Others will pass it by but won't pay it too much mind.
        Your flesh will feed the occasional animal, slowly giving back what you
        have taken for yourself during your life. Eventually, even your bones
        will disappear and there will be no more reminders of who you once were.
        Ashes to ashes, dust to dust.
      </p>
      <button>New Nomad</button>
    </div>
  );
};

export default Death;
