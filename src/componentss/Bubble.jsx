import styled from "styled-components";

const StyledBubble = styled.li`
  .name {
    margin: 5px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .content {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    width: 100%;

    &.right {
      flex-direction: row-reverse;

      .message {
        background-color: dodgerblue;
        color: white;
      }
    }

    .message {
      display: inline-block;
      max-width: 70%;
      padding: 10px;
      border-radius: 10px;
      font-size: 1.2rem;
      line-height: normal;
      word-wrap: break-word;

      background-color: #eee;
      color: inherit;
    }

    .time {
      display: inline-block;
      margin: 0 5px;
      font-size: 1rem;
      color: #555;
    }
  }
`;

const Bubble = ({ isMe, sender, message, createDate }) => {
  const time = new Date(createDate);
  const timeObj = {
    period: time.getHours() + 9 < 12 ? "오전" : "오후",
    hours: String(time.getHours() + 9),
    minutes: String(time.getMinutes()).padStart(2, "0"),
  };

  return (
    <StyledBubble>
      {!isMe && <p className="name">{sender}</p>}
      <div className={`content ${isMe ? "right" : "left"}`}>
        <p className={`message`}>{message}</p>
        <p className="time">{`${timeObj.period} ${timeObj.hours}:${timeObj.minutes}`}</p>
      </div>
    </StyledBubble>
  );
};

export default Bubble;
