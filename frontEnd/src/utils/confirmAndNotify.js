import Swal from "sweetalert2";

/**
 * Helper konfirmasi ➜ aksi ➜ notifikasi ➜ opsional toast
 *
 * @param {Object} options
 * @param {Object} options.confirmConfig - config Swal konfirmasi
 * @param {Function} options.actionFn - fungsi async yang akan dijalankan kalau OK
 * @param {Object} options.successConfig - config Swal untuk notif sukses
 * @param {Object} [options.errorConfig] - config Swal untuk notif error
 * @param {boolean} [options.useToast] - kalau true, notifikasi pakai toast
 * @param {Function} [options.afterSuccess] - callback kalau sukses
 */
export const confirmAndNotify = async ({
    confirmConfig,
    actionFn,
    successConfig,
    errorConfig,
    useToast = false,
    afterSuccess,
}) => {
    const { value: isConfirmed } = await Swal.fire({
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0e7490",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        ...confirmConfig,
    });

    if (isConfirmed) {
        try {
            await actionFn?.();

            if (useToast) {
                await Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                }).fire({
                    icon: "success",
                    title: successConfig?.title || "Berhasil!",
                });
            } else {
                await Swal.fire({
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    ...successConfig,
                });
            }

            if (afterSuccess) {
                afterSuccess();
            }
        } catch (error) {
            throw error;
        }
    }
};

// cara pakai
//import { confirmAndNotify } from "../utils/confirmAndNotify";

//const handleSave = async () => {
//  await confirmAndNotify({
//    confirmConfig: {
//      title: "Simpan Data?",
//      text: "Pastikan data sudah benar.",
//    },
//    actionFn: async () => {
//      // Contoh simpan ke server
//      await fakeSaveApi();
//    },
//    successConfig: {
//      title: "Data berhasil disimpan!",
//    },
//    errorConfig: {
//      title: "Ups!",
//      text: "Gagal menyimpan data.",
//    },
//    useToast: true, // 🔥 Pake toast!
//    afterSuccess: () => {
//      console.log("Redirect, refetch, atau clear form di sini!");
//    },
//  });
//};

//// Contoh dummy API
//const fakeSaveApi = async () => {
//  await new Promise((resolve) => setTimeout(resolve, 1000));
//  // throw new Error("Simulasi error");
//};
