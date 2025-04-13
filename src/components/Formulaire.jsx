import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Switch } from "@mui/material";  // MUI pour les composants UI

const Formulaire = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      comingForChristmas: false,
      startDate: '',
      endDate: '',
      numAdults: 0,
      adults: [],
      hasPitchounes: false,
      numChildren: 0,
    },
  });

  const [adults, setAdults] = useState([]);
  const [pitchouneFields, setPitchouneFields] = useState([]);

  const addAdult = () => {
    setAdults([...adults, { name: '', hasChildren: false, numChildren: 0 }]);
  };

  const removeAdult = (index) => {
    setAdults(adults.filter((_, i) => i !== index));
  };

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/* Toggle "Je viens pour Noël" */}
      <Controller
        name="comingForChristmas"
        control={control}
        render={({ field }) => (
          <label>
            <Switch {...field} />
            Je viens pour Noël
          </label>
        )}
      />

      {/* Afficher les champs seulement si le toggle est activé */}
      {watch("comingForChristmas") && (
        <>
          {/* Champs de dates */}
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="De" type="date" fullWidth />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="À" type="date" fullWidth />
            )}
          />

          {/* Nombre d'adultes */}
          <Controller
            name="numAdults"
            control={control}
            render={({ field }) => (
              <div>
                <label>Nombre d'adultes :</label>
                <button type="button" onClick={() => setValue('numAdults', Math.max(0, field.value - 1))}>-</button>
                <input {...field} type="number" min="0" />
                <button type="button" onClick={() => setValue('numAdults', field.value + 1)}>+</button>
              </div>
            )}
          />

          {/* Affichage dynamique des prénoms */}
          {adults.map((_, index) => (
            <div key={index}>
              <Controller
                name={`adults[${index}].name`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={`Prénom ${index + 1}`} fullWidth />
                )}
              />
              {/* Ajouter toggle pour chaque adulte */}
              <Controller
                name={`adults[${index}].hasChildren`}
                control={control}
                render={({ field }) => (
                  <label>
                    <Switch {...field} />
                    J'ai des pitchounes !
                  </label>
                )}
              />
              {/* Affichage des enfants si "J'ai des pitchounes" est activé */}
              {watch(`adults[${index}].hasChildren`) && (
                <div>
                  <label>Nombre d'enfants :</label>
                  <button type="button" onClick={() => setValue(`adults[${index}].numChildren`, Math.max(0, watch(`adults[${index}].numChildren`) - 1))}>-</button>
                  <input {...control.register(`adults[${index}].numChildren`)} type="number" min="0" />
                  <button type="button" onClick={() => setValue(`adults[${index}].numChildren`, watch(`adults[${index}].numChildren`) + 1)}>+</button>
                </div>
              )}
              {/* Supprimer un adulte */}
              <button type="button" onClick={() => removeAdult(index)}>Supprimer</button>
            </div>
          ))}

          {/* Ajouter un adulte */}
          <button type="button" onClick={addAdult}>Ajouter un adulte</button>

          {/* Message supplémentaire */}
          <Controller
            name="additionalMessage"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Tu vois quelque chose à ajouter ?" fullWidth />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Confirmer les dates
          </Button>
        </>
      )}
    </form>
  );
};

export default Formulaire;
