import canada from '../../static/images/CANADA.jpg';
import greatBritain from '../../static/images/GBR.jpg';
import president from '../../static/images/PRESIDENT.jpg';
import illuminate from '../../static/images/illuminate spotify.jpg';
import pearl from '../../static/images/pearl earring-min.jpg';
import scene from '../../static/images/scene.jpg';
import virology from '../../static/images/virology.jpg';
import naturalSelection from '../../static/images/natural-selection.jpg';

export const COUNTRY_COLLECTION = {
  collectionHeader: 'The Country Collection',
  collectionDescFirst: "did you vote? because if you did it doesn't matter",
  collectionDescSecond: 'WELCOME TO THE FUTURE | A RETURN TO THE PAST',
  imageObjList: [
    {
      src: canada,
      alt: 'Canada'
    },
    {
      src: greatBritain,
      alt: 'Great Britain'
    },
    {
      src: president,
      alt: 'United States of America'
    }
  ]
};

export const PAINTING_COLLECTION = {
  collectionHeader: 'The Painting Collection',
  collectionDescFirst: 'is this considered vandalism or art?',
  collectionDescSecond: 'ART IS IN THE HOUSE OF THE RICHEST',
  imageObjList: [
    {
      src: pearl,
      alt: 'Pearl Earring'
    },
    {
      src: scene,
      alt: 'Waves'
    }
  ]
};

export const VIRAL_COLLECTION = {
  collectionHeader: 'The Viral Collection',
  collectionDescFirst: "lockdown or the virus? can't breathe either way",
  collectionDescSecond: 'MILLIONS INFECTED. INACTION OR INEVITABLE',
  imageObjList: [
    {
      src: virology,
      alt: 'Coronavirus'
    },
    {
      src: illuminate,
      alt: 'Illuminate'
    },
    {
      src: naturalSelection,
      alt: 'Natural Selection'
    }
  ]
};
