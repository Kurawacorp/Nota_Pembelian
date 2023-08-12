document.addEventListener("DOMContentLoaded", function() {
  const buatNotaButton = document.getElementById("buatNota");
  const notaTable = document.getElementById("notaTable");
  const notaBody = document.getElementById("notaBody");
  const totalHargaCell = document.getElementById("totalHarga");
  const diskonColumn = document.getElementById("diskonColumn");
  const totalSetelahDiskon = document.getElementById("totalSetelahDiskon");
  const totalDP = document.getElementById("totalDP");
  const totalKekurangan = document.getElementById("totalKekurangan");
  const downloadButton = document.getElementById("downloadButton");
  const statusBayarSelect = document.getElementById("statusBayar");
  const uangMukaContainer = document.getElementById("uangMukaContainer");
  const uangMukaInput = document.getElementById("uangMuka");

  let totalHarga = 0;
  let totalDp = 0;
  let totalKekuranganBiaya = 0;
  let noBaris = 0;

  statusBayarSelect.addEventListener("change", function() {
    if (statusBayarSelect.value === "DP") {
      uangMukaContainer.classList.remove("hidden");
    } else {
      uangMukaContainer.classList.add("hidden");
    }
  });

  buatNotaButton.addEventListener("click", function() {
    const namaBarang = document.getElementById("namaBarang").value;
    const kodeKaos = document.getElementById("kodeKaos").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const harga = parseFloat(document.getElementById("harga").value);
    const diskon = parseFloat(document.getElementById("diskon").value) || 0;
    const statusBayar = statusBayarSelect.value;
    const uangMuka = statusBayar === "DP" ? parseFloat(uangMukaInput.value) : 0;

    const totalHargaBaris = jumlah * harga;
    const diskonAmount = totalHargaBaris * (diskon / 100);
    const totalSetelahDiskonBaris = totalHargaBaris - diskonAmount;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${++noBaris}</td>
        <td>${namaBarang}</td>
        <td>${kodeKaos}</td>
        <td>${jumlah}</td>
        <td>${harga}</td>
        <td>${totalHargaBaris.toFixed(2)}</td>
        <td>${statusBayar}</td>
        <td>${uangMuka.toFixed(2)}</td>
    `;

    notaBody.appendChild(newRow);

    totalHarga += totalHargaBaris;
    const totalDiskon = totalHarga * (diskon / 100);
    const totalSetelahDiskonValue = totalHarga - totalDiskon;
    const kekuranganBiaya = totalHargaBaris - uangMuka;

    totalDp += uangMuka;
    totalKekuranganBiaya += kekuranganBiaya;

    if (statusBayar === "Lunas") {
      totalKekuranganBiaya = 0;
    }

    totalHargaCell.textContent = totalHarga.toFixed(2);
    diskonColumn.textContent = totalDiskon.toFixed(2);
    totalSetelahDiskon.textContent = totalSetelahDiskonValue.toFixed(2);
    totalDP.textContent = totalDp.toFixed(2);
    totalKekurangan.textContent = totalKekuranganBiaya.toFixed(2);

    notaTable.classList.remove("hidden");
    downloadButton.classList.remove("hidden");
  });

  downloadButton.addEventListener("click", function () {
    html2canvas(notaTable).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "nota_pembelian.jpg";
      const canvasWithMargin = document.createElement("canvas");
      const context = canvasWithMargin.getContext("2d");
  
      // Add some margin to the canvas
      const margin = 10;
      canvasWithMargin.width = canvas.width + 2 * margin;
      canvasWithMargin.height = canvas.height + 2 * margin;
  
      context.fillStyle = "#ffffff"; // Set the margin color
      context.fillRect(0, 0, canvasWithMargin.width, canvasWithMargin.height);
  
      // Draw the original canvas on the larger canvas with margin
      context.drawImage(canvas, margin, margin);
  
      link.href = canvasWithMargin.toDataURL("image/jpeg");
      link.click();
    });
  });
  
});
