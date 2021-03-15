import {
  makeStyles,
  FormLabel,
  Chip,
  Typography,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: ".5rem 0 .5rem",
    textAlign: "center",
  },
  chipsDiv: {
    marginTop: ".3rem",
  },
  chip: {
    margin: ".5rem",
    padding: "0.5rem",
  },
  formHelperText: {
    textAlign: "center",
  },
}));

const Tags = ({
  value,
  setValue,
  options,
  label
}) => {
  const classes = useStyles();

  const handleClick = (clickedValue) => {
    if (value.find((e) => e === clickedValue)) {
      const index = value.findIndex((e) => e === clickedValue);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);
    } else {
      setValue([...value, clickedValue]);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.chipsDiv}>
          {options && options.length
            ? options.map((option, i) => (
                <Chip
                  icon={option.icon}
                  size="small"
                  className={classes.chip}
                  key={i}
                  color="primary"
                  variant={
                    value.find((e) => e === option.value)
                      ? "default"
                      : "outlined"
                  }
                  label={
                    <Typography variant="body2">{`${option.label}`}</Typography>
                  }
                  clickable
                  onClick={() => handleClick(option.value)}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};
export default Tags;