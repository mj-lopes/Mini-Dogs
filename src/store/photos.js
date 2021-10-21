import createAsyncSlice from "./helper/createAsyncSlice";

const photos = createAsyncSlice({
  name: "photos",
  initialState: {
    list: [],
    page: 1,
    hasPhotos: true,
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload);
      state.page++;
      if (action.payload.length < 3) state.hasPhotos = false;
    },
    removePhotos(state) {
      state.list = [];
      state.page = 0;
      state.hasPhotos = true;
      state.data = null;
      state.error = null;
    },
  },
  fetchConfig: (page) => ({
    url: `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=3&_user=0`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});

export const { addPhotos, removePhotos } = photos.actions;
const fetchPhotos = photos.asyncAction;

export const loadNewPhotos =
  (page = 1) =>
  async (dispatch) => {
    const { payload } = await dispatch(fetchPhotos(page));
    dispatch(addPhotos(payload));
  };

export default photos.reducer;
