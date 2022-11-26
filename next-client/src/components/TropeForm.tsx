import { useStoreActions } from "../store/store";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {Fragment} from "react";

const toString = (arr: string[] | []) => arr.join(" | ");
const toArray = (str: string) => str.split(" | ");

const TropeForm = (props) => {
  const {trope, labels} = props;
  const updateTrope = useStoreActions((actions) => actions.game.updateTrope);

  const { register, handleSubmit } = useForm();

  const buildParams = (data) => {
    const params = {...data};
    params.bonus = (params.bonus === "") ? [] : toArray(params.bonus);
    params.points = Number(params.points);
    params.bonus_pts = Number(params.bonus_pts);
    params._id = trope._id;
    return params;
  }

  const onSubmit = (data) => updateTrope(buildParams(data));

  const Inputs = Object.keys(trope).filter((label)=>labels.includes(label)).map((label,i) => {
    const value = (typeof trope[label] === 'object') ? toString(trope[label]) : trope[label];
    return (
      <Fragment key={`${trope._id}-frag-${label}`}>
        <label >{label}</label>
        <input defaultValue={value} {...register(`${label}`)} />
      </Fragment>
    )
  })

  return (
    <form style={{display:"flex", justifyContent: "space-around"}}key={`${trope._id}-form`} onSubmit={handleSubmit(onSubmit)}>
      {Inputs}
      <input key={"submit"} type="submit" />
    </form>
  );
};

export default TropeForm;
